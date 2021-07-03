import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import Link from "next/link"


export default function MyPage() {
 const router = useRouter()
 const [session, loading] = useSession()

 if (loading) {
   return <div>Loading....</div>
 }
 if (!session) {
   router.push("/")
 }

 return (
   <div>
     MyPage
     <p>{session.user.name}</p>
     <img src={session.user.image} />
     <Link href="/">Back to HOME</Link>
   </div>
 )
}
