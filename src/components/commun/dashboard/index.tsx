"use client"

import { authClient } from "@/lib/auth-client" // import the auth client
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { toast } from "sonner";
export default function DashboardComponent(){
    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession();
    
    const router = useRouter();
    
    useEffect(() => {
        if (isPending) return;

        const notAuthorized = !session || session.user.isAdmin === false;

        if (notAuthorized) {
            toast.error("Você não tem permissão para acessar essa página", {
                position: "top-right",
                style: {
                    borderRadius: '8px',
                    background: '#ef4444',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    padding: '16px',
                },
            });
            router.push("/admin");
        }
    }, [session, isPending, router]);

    return (
        <main className="w-full h-full min-h-screen flex justify-center items-center">
            {isPending ? (
                <h1>Carregando...</h1>
            ) : (
                <div className="flex flex-col">
                    <h1>Sessão</h1>
                    <p>
                        Nome:
                        {session?.user.name}
                    </p>
                    <p>
                        Email: 
                        {session?.user.email}
                    </p>
                </div>
            )}
        </main>
    )
}
