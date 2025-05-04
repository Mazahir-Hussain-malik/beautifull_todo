import { Pencil, Trash, Plus, Check } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Todo = () => {
  const [title, setTitle] = useState("")
  const [price, setprice] = useState(0)
  const [description, setdescription] = useState("")
  const [edit, setIsEdit] = useState(null)
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "mazahir",
      price: 20,
      description: "hello this is description",
    },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (edit) {
      setTodos(
        todos.map((item) =>
          item.id === edit.id
            ? {
                ...item,
                title: title,
                price: price,
                description: description,
              }
            : item,
        ),
      )
      setIsEdit(null)
      setTitle("")
      setprice(0)
      setdescription("")
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: title,
          price: price,
          description: description,
        },
      ])
      setTitle("")
      setprice(0)
      setdescription("")
    }
  }

  const editTodo = (items) => {
    setTitle(items.title)
    setprice(items.price)
    setdescription(items.description)
    setIsEdit(items)
  }

  const delteTodo = (id) => {
    setTodos(
      todos.filter((items) => {
        return items.id !== id
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-emerald-600">
          <span className="inline-block relative">
            Product Manager
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 bg-emerald-600 text-white">
              <h3 className="text-xl font-semibold flex items-center">
                {edit ? (
                  <>
                    <Check className="mr-2 h-5 w-5" /> Edit Product
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" /> Add New Product
                  </>
                )}
              </h3>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="number"
                  placeholder="Enter price"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 outline-none"
                  value={price}
                  onChange={(e) => setprice(Number(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  rows={5}
                  placeholder="Enter product description"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 outline-none resize-none"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-3 rounded-lg shadow-lg text-white font-medium text-lg ${
                  edit ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-600 hover:bg-emerald-700"
                } transition-all duration-200`}
              >
                {edit ? "Update Product" : "Add Product"}
              </motion.button>

              {edit && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setIsEdit(null)
                    setTitle("")
                    setprice(0)
                    setdescription("")
                  }}
                  className="w-full mt-2 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium text-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </motion.button>
              )}
            </form>
          </motion.div>

          {/* Products List Section */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6 bg-emerald-600 text-white">
              <h3 className="text-xl font-semibold">Product List</h3>
            </div>

            <div className="p-6">
              {todos.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-gray-500"
                >
                  No products available. Add your first product!
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {todos.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
                                ${item.price.toFixed(2)}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => editTodo(item)}
                                className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-200"
                              >
                                <Pencil className="h-5 w-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => delteTodo(item.id)}
                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                              >
                                <Trash className="h-5 w-5" />
                              </motion.button>
                            </div>
                          </div>
                          <p className="mt-3 text-gray-600 line-clamp-2">{item.description}</p>

                          <motion.button
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="mt-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                            onClick={() => {
                              // This could be expanded to show full description in a modal
                              alert(item.description)
                            }}
                          >
                            Read more
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Todo;