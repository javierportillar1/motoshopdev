import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm group hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{value}</div>
        {trend && (
          <p className={`text-xs mt-1 ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}