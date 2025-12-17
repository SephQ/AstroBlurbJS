# AstroBlurb v2

Astrology web app using [sweph](https://github.com/timotejroiko/sweph) (Swiss Ephemeris) for planetary calculations.

## Features

- ✅ Swiss Ephemeris integration for high-precision planetary positions
- ✅ Zodiac sign conversion (ecliptic longitude → sign + degree/minute/second)
- 🚧 House calculations (Placidus, Whole Sign, etc.)
- 🚧 Lunar nodes (true/mean)
- 🚧 Aspects between planets
- 🚧 Web API for birth chart generation

## Prerequisites

- **Node.js 24+**
- **Visual Studio Build Tools 2026** (or 2022) with "Desktop development with C++" workload
- **Python 3.x** (for node-gyp)

## Installation

```bash
# Install sweph with VS 2026
npm install sweph
cd node_modules/sweph
npm run preinstall
npx node-gyp rebuild
cd ../..
```

## Usage

Test planetary calculations with default date (1990-01-01 12:00 UTC):
```bash
node test.js
```

Test with custom date:
```bash
node test.js 1995-06-15T08:30:00Z
```

### Sample Output

```
=== Planetary Positions ===
Date: 1990-01-01T12:00:00.000Z
Julian Day: 2447893

SUN        Capricorn 10°48'51"
MOON       Pisces 3°16'4"
MERCURY    Capricorn 25°40'22"
VENUS      Aquarius 6°13'19"
MARS       Sagittarius 10°0'0"
JUPITER    Cancer 5°8'56"
SATURN     Capricorn 15°39'27"
URANUS     Capricorn 5°47'8"
NEPTUNE    Capricorn 12°2'17"
PLUTO      Scorpio 17°5'35"
```

## API Data Structure

Returns JSON with:
- Julian Day
- Date (ISO 8601 UTC)
- Ephemeris path
- Planet positions:
  - `longitude` (0-360° ecliptic longitude)
  - `zodiac` (sign, degree, minute, second, formatted string)
  - `latitude` (ecliptic latitude)
  - `distance` (AU from Earth)
  - `speed_long` (daily motion in longitude)

## Ephemeris Files

Located in `/ephe` folder. Swiss Ephemeris files cover 600-year ranges:
- `sepl_*.se1` - planets
- `semo_*.se1` - moon
- `seas_*.se1` - main asteroids

## Next Steps

- Add house calculations (`houses` function)
- Add lunar nodes (true/mean)
- Add zodiac sign converter (longitude → Aries 15°30')
- Create astrology API wrapper
