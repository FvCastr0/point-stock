import verifyToken from "../../controllers/verifyToken"

export default function Dashboard() {
    verifyToken()

    return (
        <div>Ola</div>
    )
}