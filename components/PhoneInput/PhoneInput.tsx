"use client";

import { useState } from "react";
import { PHONE_COUNTRY_CODES } from "@/lib/utils/getPhoneCountryCodes";
import styles from "./PhoneInput.module.scss";

export default function PhoneInput() {
  const [selectedCountry, setSelectedCountry] = useState(
    PHONE_COUNTRY_CODES[0],
  );

  return (
    <div className={styles.phoneInput}>
      <select
        name="countryCode"
        id="countryCode"
        className={styles.countryCode}
        title={selectedCountry.countryName}
        required
        onChange={(e) => {
          const country = PHONE_COUNTRY_CODES.find(
            (c) => c.countryCode === e.target.value,
          );

          if (country) {
            setSelectedCountry(country);
          }
        }}
      >
        {PHONE_COUNTRY_CODES.map((code) => (
          <option key={code.countryCode} value={code.countryCode}>
            {code.countryName} ({code.countryCode})
          </option>
        ))}
      </select>

      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        placeholder={selectedCountry.example}
        minLength={selectedCountry.minLength}
        maxLength={selectedCountry.maxLength}
        pattern="[0-9]+"
        inputMode="numeric"
        autoComplete="tel-national"
        className={styles.phoneNumber}
        required
      />
    </div>
  );
}
