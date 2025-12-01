import React from 'react';

export default function Filters({ q, setQ, category, setCategory, size, setSize, minPrice, setMinPrice, maxPrice, setMaxPrice, onApply }) {
  return (
    <div className="filters">
      <input placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>
      <select value={size} onChange={e => setSize(e.target.value)}>
        <option value="">All Sizes</option>
        <option>S</option><option>M</option><option>L</option><option>XL</option>
      </select>
      <input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      <button onClick={onApply}>Apply</button>
    </div>
  );
}