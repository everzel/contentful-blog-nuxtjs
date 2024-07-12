import { Assertion, describe, expect, it } from "vitest";
import { useFormatDate } from "@/composables/useDate.ts";

describe('useDate composition', (): void => {
  it('should return formatted date', (): void => {
    expect<Assertion>(useFormatDate('2024-07-11')).toBe('July 11, 2024');
  });
});