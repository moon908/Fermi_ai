import Navigation from "../components/navigation/Navigation"
import Hero from "../components/Hero/Hero"
import Text from "../components/text/Text"
import About from "../components/about/About"
import Footer from "../components/footer/Footer"

const page = () => {
    return (
        <div className="bg-black">
            <Navigation />
            <Hero />
            <Text />
            <About />
            <Footer />
        </div>
    )
}

export default page