"use client";

import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudFog } from 'lucide-react';

function getWeatherCondition(code) {
  if (code === 0) return { label: 'Cerah Berangin', icon: Sun };
  if (code === 1 || code === 2) return { label: 'Cerah Berawan', icon: Sun };
  if (code === 3) return { label: 'Sejuk & Berawan', icon: Cloud };
  if (code >= 45 && code <= 48) return { label: 'Berkabut Tebal', icon: CloudFog };
  if (code >= 51 && code <= 65) return { label: 'Gerimis Sejuk', icon: CloudRain };
  if (code >= 80) return { label: 'Hujan Pegunungan', icon: CloudRain };
  return { label: 'Sejuk & Berawan', icon: Cloud };
}

export default function LiveWeatherDieng({ className = '', iconClassName = 'text-stone-300/80' }) {
  const [temp, setTemp] = useState(14);
  const [condition, setCondition] = useState('Sejuk & Berawan');
  const [IconComponent, setIconComponent] = useState(() => Cloud);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-7.2046&longitude=109.9077&current=temperature_2m,weather_code&timezone=Asia%2FJakarta'
        );
        if (!res.ok) throw new Error('Weather fetch error');
        const data = await res.json();
        const current = data.current;
        const info = getWeatherCondition(current.weather_code);
        setTemp(Math.round(current.temperature_2m));
        setCondition(info.label);
        setIconComponent(() => info.icon);
      } catch (err) {
        setTemp(14);
        setCondition('Sejuk & Berawan');
        setIconComponent(() => Cloud);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-stone-300/90 font-normal tracking-wide ${className}`}>
      <IconComponent className={`h-3.5 w-3.5 shrink-0 ${iconClassName}`} aria-hidden="true" />
      <span>Dieng sekarang: {temp}°C · {condition}</span>
    </span>
  );
}
