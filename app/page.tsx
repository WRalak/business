import Image from "next/image"
import banner from './assets/banner.jpg'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { delay } from "@/lib/utils"
import { Suspense } from "react"
import { getWixClient } from "@/lib/wix-client.base"
import Product from "@/components/products"
import { Skeleton } from "@/components/ui/skeleton"

const page = () => {
  return (
    <main className='mx-auto max-w-7xl space-y-10 px-5 py-10'>
      <div className='flex items-center bg-secondary md:h-96'>
        <div className='space-y-7 p-10 text-center md:1/2'>
        <h1 className=" text-3xl md:text-4xl font-bold">Fill The Void In Your Heart</h1>
        <p>
          Tough day?Credit card maxed out?Buy some expensive stuff and become happy again!
        </p>
           <Button asChild>
            <Link href='/shop'>
            Shop Now <ArrowRight/>
            </Link>
           </Button>

        </div>
        <div className=' relative hidden md:block w-1/2 h-full'>

        <Image
        src={banner}
        className="h-full object-cover"
        alt="the banner"
        />
        <div className=" absolute inset-0 bg-gradient-to-r from-secondary via-transparent to to-transparent"/>
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton/>}>
      <FeaturedProducts/>
      </Suspense>
     
    </main>
  )
}

export default page

async function FeaturedProducts() {
  await delay(1000)
const wixClient=getWixClient();

const {collection}=await wixClient.collections.getCollectionBySlug("featured-products");

if(!collection?._id){
  return null
}
const featuredProducts =await wixClient.products.queryProducts().hasSome("collectionIds",[collection._id])
.descending("lastUpdated")
.find();

if(!featuredProducts.items.length){
  return null;
}

  return <div className="space-y-5">
    <h2 className=" text-2xl font-bold">Fearured Products</h2>
    <div className="flex  gap-3 flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {featuredProducts.items.map((product)=>(
        <Product key={product._id} product={product}/>
      ))}
    </div>
    <pre>
   
    </pre>
  </div>
  
}

function LoadingSkeleton(){
  return <div className="flex  gap-3 flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-12">
{Array.from({length:8}).map((_,i)=>
(<Skeleton key={i} className="h-[26rem] w-full"/>))}
  </div>
}