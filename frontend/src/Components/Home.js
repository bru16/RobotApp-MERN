import Robots from './Robots'
import useRobots from './customHooks/useRobots'
import Loading from './Loading'

const Home = ({ token }) => {
    const robots = useRobots({ token });
    return (
        robots === null ? <Loading /> : <Robots robot={robots} />
    )
}

export default Home;