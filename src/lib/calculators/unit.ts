import { UnitCategory, Unit } from '../types';

const lengthUnits: Unit[] = [
  { id: 'mm', name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: 'cm', name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  { id: 'm', name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
  { id: 'km', name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'in', name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  { id: 'ft', name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  { id: 'yd', name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  { id: 'mi', name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
];

const massUnits: Unit[] = [
  { id: 'mg', name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
  { id: 'g', name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: 'kg', name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
  { id: 't', name: 'Tonne', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'lb', name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  { id: 'oz', name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  { id: 'st', name: 'Stone', symbol: 'st', toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
];

const temperatureUnits: Unit[] = [
  { id: 'c', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
  { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
  { id: 'k', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
];

const volumeUnits: Unit[] = [
  { id: 'ml', name: 'Milliliter', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: 'l', name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
  { id: 'm3', name: 'Cubic Meter', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'gal', name: 'Gallon (US)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
  { id: 'qt', name: 'Quart (US)', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
  { id: 'pt', name: 'Pint (US)', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
  { id: 'cup', name: 'Cup (US)', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  { id: 'floz', name: 'Fluid Ounce', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
];

const areaUnits: Unit[] = [
  { id: 'mm2', name: 'Square Millimeter', symbol: 'mm²', toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
  { id: 'cm2', name: 'Square Centimeter', symbol: 'cm²', toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
  { id: 'm2', name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
  { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  { id: 'km2', name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  { id: 'ft2', name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  { id: 'ac', name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
  { id: 'mi2', name: 'Square Mile', symbol: 'mi²', toBase: (v) => v * 2.59e6, fromBase: (v) => v / 2.59e6 },
];

export const UNIT_CATEGORIES: UnitCategory[] = [
  { id: 'length', name: 'Length', units: lengthUnits },
  { id: 'mass', name: 'Mass', units: massUnits },
  { id: 'temperature', name: 'Temperature', units: temperatureUnits },
  { id: 'volume', name: 'Volume', units: volumeUnits },
  { id: 'area', name: 'Area', units: areaUnits },
];

export function convertUnit(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
  categoryId: string
): number {
  // For temperature, we need special handling for the conversion
  if (categoryId === 'temperature') {
    // Convert to Celsius first, then to target
    const inCelsius = fromUnit.toBase(value);
    return toUnit.fromBase(inCelsius);
  }
  
  // For other units, convert to base unit then to target
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
}
