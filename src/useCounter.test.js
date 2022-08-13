import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";

let mockValues = {
  intervalIdRef: {
    current: undefined,
  },
  delay: 500, //ms
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();

  mockValues.intervalIdRef.current = undefined;
});

describe("useCounter", () => {
  it("onMouseClick", () => {
    const { result } = renderHook(() => useCounter(mockValues));

    act(() => {
      result.current.onMouseClick();
      jest.advanceTimersByTime(mockValues.delay);
    });

    expect(result.current.countValue).toBe(1);
  });

  it("onMouseClickLeft", () => {
    const { result } = renderHook(() => useCounter({ ...mockValues, initialCountValue: 5 }));

    act(() => {
      result.current.onMouseClick();
      jest.advanceTimersByTime(mockValues.delay);
      result.current.onMouseClickLeft();
    });

    expect(result.current.countValue).toBe(5);
  });

  it("initalCountValue", () => {
    const { result } = renderHook(() => useCounter({ ...mockValues, initialCountValue: 5 }));

    expect(result.current.countValue).toBe(5);
  });

  it("incrementCountValue", () => {
    const { result } = renderHook(() => useCounter({ ...mockValues, incrementCountValue: 5 }));

    act(() => {
      result.current.onMouseClick();
      jest.advanceTimersByTime(mockValues.delay);
    });

    expect(result.current.countValue).toBe(5);
  });

  it("delay", () => {
    const { result } = renderHook(() => useCounter({ ...mockValues, delay: 1000 }));

    act(() => {
      result.current.onMouseClick();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.countValue).toBe(1);
  });
});
