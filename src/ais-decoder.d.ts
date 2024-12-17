declare module 'ais-decoder' {
  interface AisDecode {
    new (input: string, session: any): AisDecode; // Modifikasi untuk mendukung penggunaan `new`
    valid: boolean;
    aistype: number;
    mmsi: string;
    lon?: number;
    lat?: number;
    GetNavStatus(): string;
    Getaistype(): string;
    GetVesselType(): string;
  }

  interface GGencode {
    AisDecode: AisDecode;
    AisEncode: (data: any) => string;
    NmeaDecode: (nmea: string) => any;
    NmeaEncode: (data: any) => string;
  }

  const GGencode: GGencode;
  export = GGencode;
}
