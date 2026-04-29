"use client";

interface FilterBarProps {
  filters: {
    gender: string;
    country_id: string;
    age_group: string;
  };
  onFilterChange: (filters: Partial<FilterBarProps["filters"]>) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const genderOptions = ["", "male", "female"];
  const ageGroupOptions = ["", "child", "teenager", "adult", "senior"];

  return (
    <div className="flex gap-4 mt-4 flex-wrap">
      <select
        value={filters.gender}
        onChange={(e) => onFilterChange({ gender: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {genderOptions.map((g) => (
          <option key={g || "all"} value={g}>
            {g || "All Genders"}
          </option>
        ))}
      </select>

      <select
        value={filters.age_group}
        onChange={(e) => onFilterChange({ age_group: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {ageGroupOptions.map((a) => (
          <option key={a || "all"} value={a}>
            {a || "All Ages"}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Country Code (e.g., NG)"
        value={filters.country_id}
        onChange={(e) =>
          onFilterChange({ country_id: e.target.value.toUpperCase() })
        }
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <button
        onClick={() =>
          onFilterChange({ gender: "", country_id: "", age_group: "" })
        }
        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
