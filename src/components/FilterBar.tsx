"use client";

import { ChangeEvent } from "react";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

export interface Filters {
  search: string;
  category: string;
  location: string;
  type: string;
  experience: string;
  workMode: string;
  salaryMin?: number;
}

interface FilterBarProps {
  filters: Filters;
  categories: any[];
  locations?: string[];
  onChange: (filters: Filters) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function FilterBar({ filters, categories, locations, onChange }: FilterBarProps) {
  const handleSearchChange = (value: string) => {
    onChange({ ...filters, search: value });
  };

  const handleSelect = (field: keyof Filters) => (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, [field]: e.target.value });
  };

  const selectClass = "flex-1 h-[50px] min-w-[140px] appearance-none rounded-2xl border border-line bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-[0_1px_0_rgba(20,18,31,0.02)] transition-all hover:border-purple/50 focus:border-purple focus:outline-none focus:ring-4 focus:ring-purple/10 bg-no-repeat cursor-pointer";
  
  const selectStyle = {
    backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')`,
    backgroundPosition: 'right 16px center',
    paddingRight: '44px'
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="flex flex-wrap items-center gap-3 py-6 w-full"
    >
      <motion.div variants={item} className="flex-1 min-w-[220px]">
        <SearchBar value={filters.search} onChange={handleSearchChange} />
      </motion.div>
      <motion.select
        variants={item}
        value={filters.category}
        onChange={handleSelect('category')}
        className={selectClass}
        style={selectStyle}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </motion.select>
      <motion.select
        variants={item}
        value={filters.location}
        onChange={handleSelect('location')}
        className={selectClass}
        style={selectStyle}
      >
        <option value="">All Locations</option>
        {locations ? (
          locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))
        ) : (
          <>
            <option value="Remote">Remote</option>
            <option value="Bangalore, India">Bangalore, India</option>
            <option value="Hyderabad, India">Hyderabad, India</option>
            <option value="Gurugram, India">Gurugram, India</option>
            <option value="Chennai, India">Chennai, India</option>
          </>
        )}
      </motion.select>
      <motion.select
        variants={item}
        value={filters.type}
        onChange={handleSelect('type')}
        className={selectClass}
        style={selectStyle}
      >
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </motion.select>
      <motion.select
        variants={item}
        value={filters.experience}
        onChange={handleSelect('experience')}
        className={selectClass}
        style={selectStyle}
      >
        <option value="">All Experience</option>
        <option value="0–2 years">0–2 years</option>
        <option value="2–4 years">2–4 years</option>
        <option value="3–6 years">3–6 years</option>
        <option value="4–7 years">4–7 years</option>
      </motion.select>
      <motion.select
        variants={item}
        value={filters.workMode}
        onChange={handleSelect('workMode')}
        className={selectClass}
        style={selectStyle}
      >
        <option value="">All Work Modes</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
        <option value="On-site">On-site</option>
      </motion.select>
      <motion.select
        variants={item}
        value={filters.salaryMin || ""}
        onChange={(e) => onChange({ ...filters, salaryMin: e.target.value ? parseInt(e.target.value) : undefined })}
        className={selectClass}
        style={selectStyle}
      >
        <option value="">Any Salary</option>
        <option value="500000">₹5,00,000+</option>
        <option value="1000000">₹10,00,000+</option>
        <option value="1500000">₹15,00,000+</option>
        <option value="2500000">₹25,00,000+</option>
      </motion.select>
    </motion.div>
  );
}
