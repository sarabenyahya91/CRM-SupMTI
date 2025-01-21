import Logo from "../components/Logo";
import RegisterForm from "../components/RegisterForm";



export default function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">

            <div className="space-y-24">
                <Logo height="h-16" width="w-72" crm="text-5xl" supmti="text-3xl" />
                <RegisterForm />
            </div>
        </div>
    );
}


