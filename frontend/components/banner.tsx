import { ArrowBigRight } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
export default function Banner() {


    const router = useRouter();
    return (
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-10 sm:py-14">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-9xl sm:text-4xl font-bold text-foreground mb-10">
              Are you feeling broke lately?
            </h2>
            <div className="text-muted-foreground max-w-lg mx-auto flex justify-center  items-center gap-4">
let's fix that <span> <Button onClick={() => router.replace('compare') }>Start comparing</Button> 
</span> 
            </div>
          </div>
          {/* <SearchBar value={search} onChange={setSearch} /> */}
        </div>
      </section>
    )
} 