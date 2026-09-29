import { describe, expect, it } from "vitest";
import { isbnErrors, titleErrors } from "../js/new-book.js";

describe("new-book validation", () => {
  it("requires an ISBN", () => {
    expect(isbnErrors("")).toEqual([
      "Please insert an ISBN (international standard book number).",
    ]);
  });

  it("requires digits only and max length 13", () => {
    expect(isbnErrors("12a")).toEqual(["ISBN must contain digits only."]);
    expect(isbnErrors("12345678901234")).toEqual([
      "ISBN must be at most 13 characters.",
    ]);
    expect(isbnErrors("9780000000001")).toEqual([]);
  });

  it("requires a non-empty title", () => {
    expect(titleErrors("")).toEqual(["Please insert a title."]);
    expect(titleErrors("   ")).toEqual(["Please insert a title."]);
    expect(titleErrors("Accessible Reads")).toEqual([]);
  });
});
