import { describe, it, expect } from "vitest";
import { encrypt, decrypt } from "@/lib/utils/crypto";

describe("crypto", () => {
	it("encrypts and decrypts", () => {
		const enc = encrypt("secret");
		expect(enc.split(".").length).toBe(3);
		expect(decrypt(enc)).toBe("secret");
	});
});