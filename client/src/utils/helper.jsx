import { toast } from "react-toastify";

//notification react toastify 
export const handleError = (err) =>
  toast.error(err, {
    position: "top-right",
    autoClose: 2000,
  });

export const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
  });


export function camelCaseToSpace(camelCaseString) {
  return camelCaseString
      .replace(/([a-z])([A-Z])/g, '$1 $2') 
      .replace(/([A-Z]+)/g, ' $1')         
      .trim();     
}

export function getDate(dateString) {
  const date = new Date(dateString);

const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const year = String(date.getFullYear());

return `${month}/${day}/${year}`;
}