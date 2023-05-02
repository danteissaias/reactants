export function useTextFilter<TData>(filterValue: string) {
  return (rows: TData[]) => {
    const search = filterValue.toLowerCase()
    return rows.filter((row) => {
      return Object.values(row as object).some((value) => {
        if (value === null || value === undefined) return false
        if (typeof value !== 'string') return false
        return value.toString().toLowerCase().includes(search)
      })
    })
  }
}
