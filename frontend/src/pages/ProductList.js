import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import ProductCard from '../components/ProductCard.js';
import Filters from '../components/Filters.js';

export default function ProductList() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [data, setData] = useState({ products: [], page: 1, totalPages: 0 });
  const [page, setPage] = useState(1);
  const limit = 8;

  const load = async () => {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (category) params.append('category', category);
    if (size) params.append('size', size);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    params.append('page', page);
    params.append('limit', limit);
    const res = await apiFetch(`/products?${params.toString()}`);
    setData(res);
  };

  useEffect(() => { load();}, [page]);

  const onApply = () => {
    setPage(1);
    load();
  };

  return (
    <div>
      <h2>Products</h2>
      <Filters
        q={q} setQ={setQ}
        category={category} setCategory={setCategory}
        size={size} setSize={setSize}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        onApply={onApply}
      />
      <div className="grid">
        {data.products.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} / {data.totalPages || 1}</span>
        <button disabled={page >= (data.totalPages || 1)} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}