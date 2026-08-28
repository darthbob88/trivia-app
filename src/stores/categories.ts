const categories = [
  { id: 8, name: 'Saints' },
  { id: 3, name: 'History' },
  { id: 4, name: 'Geography' },
  { id: 5, name: 'Science' },
  { id: 7, name: 'Entertainment' },
  { id: 9, name: 'Medicine' },
]

const getAllCategories = () => {
  return categories
}

// TODO: Make this a proper AJAX call as well as/rather than localstorage.
const getUserSelectedCategories = () => {
  const selectedCategoryIds = JSON.parse(localStorage.getItem('selectedCategories') || '[]')
  return categories.filter((category) => selectedCategoryIds.includes(category.id))
}

const saveUserSelectedCategories = (selectedCategoryIds: number[]) => {
  localStorage.setItem('selectedCategories', JSON.stringify(selectedCategoryIds))
}

export { getAllCategories, getUserSelectedCategories, saveUserSelectedCategories }
