import React from "react";

const PaymentLinksPage = () => {
  const payments = [
    {
      program: "Self Placed",
      type: "Pre-Registration",
      price: "Rs 1040",
      link: "https://paymentlink.com/self-pre",
    },
    {
      program: "Mentor Led",
      type: "Pre-Registration",
      price: "Rs 1060",
      link: "https://paymentlink.com/mentor-pre",
    },
    {
      program: "Skill Focused",
      type: "Pre-Registration",
      price: "Rs 1999",
      link: "https://paymentlink.com/skill-pre",
    },
    {
      program: "Career Focused",
      type: "Pre-Registration",
      price: "Rs 2000",
      link: "https://paymentlink.com/career-pre",
    },
    {
      program: "Self Placed",
      type: "Full Payment",
      price: "Rs 4500",
      link: "https://paymentlink.com/self-full",
    },
    {
      program: "Mentor Led",
      type: "Full Payment",
      price: "Rs 5500",
      link: "https://paymentlink.com/mentor-full",
    },
    {
      program: "Skill Focused",
      type: "Full Payment",
      price: "Rs 7500",
      link: "https://paymentlink.com/skill-full",
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
