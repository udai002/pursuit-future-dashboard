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
    <div className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Payment Links</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-blue-200">
              <th className="px-6 py-3 ">Program Opted</th>
              <th className="px-6 py-3 ">Payment Type</th>
              <th className="px-6 py-3 ">Price</th>
              <th className="px-6 py-3 ">Link</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-3 ">{row.program}</td>
                <td className="px-6 py-3 ">{row.type}</td>
                <td className="px-6 py-3 ">{row.price}</td>
                <td className="px-6 py-3  text-blue-600 font-medium">
                  <a href={row.link} target="_blank" rel="noopener noreferrer" className="hover:underline" >Link</a>
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