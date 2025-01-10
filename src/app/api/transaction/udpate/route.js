import prisma from "@/app/lib/prisma";
export async function PUT(req) {
    try {
        const {} = await req.json()
        const updateTransaction = await prisma.transaction.update({
            where:{id:}
        })
    } catch (error) {
        
    }
}