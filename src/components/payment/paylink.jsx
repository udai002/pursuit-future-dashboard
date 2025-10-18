import React from "react";

const PaymentLinksPage = () => {
  const payments = [
    {
      program: "Self Placed",
      type: "Pre-Registration",
      price: "Rs 1000",
      link: "https://rzp.io/rzp/PR-4500",
    },
    {
      program: "Mentor Led",
      type: "Pre-Registration",
      price: "Rs 1000",
      link: "https://rzp.io/rzp/PR-5500",
    },
    {
      program: "Offline Program",
      type: "Pre-Registration",
      price: "Rs 5000",
      link: "https://rzp.io/rzp/40KOP",
    },
    {
      program: "Self Paced",
      type: "Full Payment",
      price: "Rs 4500",
      link: "https://rzp.io/rzp/fullreg4.5k",
    },
    {
      program: "Mentor Led",
      type: "Full Payment",
      price: "Rs 5000",
      link: "https://rzp.io/rzp/fullreg5.5k",
    },
    {
      program: "Career Focused",
      type: "Full Payment",
      price: "Rs 9500",
      link: "https://rzp.io/rzp/fullreg9500",
    },
    {
      program: "Skill Focused",
      type: "Full Payment",
      price: "Rs 7500",
      link: "https://rzp.io/rzp/fullreg7500",
    },
    {
      program: "Career Focused",
      type: "Full Payment",
      price: "Rs 9500",
      link: "https://paymentlink.com/career-full",
    },
  ];

  return (
    <div className="p-5 bg-white w-full max-w-full max-h-full  overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Payment Links</h2>


      <div className="rounded-b-none overflow-auto max-h-[calc(100vh-160px)]">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="bg-blue-200  border-b-2 border-blue-200">
              <th className="px-6 py-3 sticky top-0 bg-slate-200 z-10 font-normal">Program Opted</th>
              <th className="px-22 py-3 sticky top-0 bg-slate-200 z-10 font-normal">Payment Type</th>
              <th className="px-24 py-3 sticky top-0 bg-slate-200 z-10 font-normal">Price</th>
              <th className="px-28 py-3 sticky top-0 bg-slate-200 z-10 font-normal">Link</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((row, index) => (
              <tr key={index} className=" hover:bg-gray-50 border-b-2 border-b-blue-200">
                <td className="px-6 py-5">{row.program}</td>
                <td className="px-22 py-3">{row.type}</td>
                <td className="px-24 py-3">{row.price}</td>
                <td className="px-28 py-3 text-blue-600 font-medium">
                  <a href={row.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentLinksPage;