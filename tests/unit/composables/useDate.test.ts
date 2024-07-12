import { describe, expect, it } from "vitest";
import { useFormatDate } from "@/composables/useDate.ts";

describe('useDate composition', () => {
  it('should return formatted date', () => {
    expect(useFormatDate('2024-07-11')).toBe('July 11, 2024');
  });
});