import React from "react";

function ReportLostItem() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-green-50 to-green-100 px-4 py-8">
      <form className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg border">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <span className="text-red-700">Report</span>{" "}
          <span className="text-green-700">Lost Item</span>
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name :</label>
          <input type="text" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Item :</label>
          <input type="text" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Location :</label>
          <input type="text" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Date :</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Item Description :</label>
          <textarea className="w-full border rounded px-3 py-2" rows={3}></textarea>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Upload Photo :</label>
          <input type="file" className="w-full" />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Submit
          </button>
          <button type="reset" className="border px-6 py-2 rounded hover:bg-gray-100">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportLostItem;