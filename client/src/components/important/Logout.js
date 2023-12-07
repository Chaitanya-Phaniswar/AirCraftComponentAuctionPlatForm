import Cookies from 'universal-cookie'
const cookies = new Cookies()
export default function Logout(){
        // destroy the cookie
        //console.log(cookies.getAll())
        cookies.remove("BUYER-TOKEN", { path: "/" });
        //console.log(cookies.getAll())
        // redirect user to the landing page
        //window.location.href = ref?ref:"/";
      }
export function AdminLogout(){
  cookies.remove('SELLER-TOKEN',{path: '/'})
}