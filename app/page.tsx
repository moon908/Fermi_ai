import Navigation from "../components/navigation/Navigation"
import Hero from "../components/Hero/Hero"
import Text from "../components/text/Text"

const page = () => {
    return (
        <div className="bg-black">
            <Navigation />
            <Hero />
            <Text />
        </div>
    )
}

export default page