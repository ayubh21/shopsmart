import { Router } from "express";
import { db } from "../db/db";
import { cart, productsToCarts } from "../db/schema";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { eq } from "drizzle-orm"

const cartRoutes = Router();

cartRoutes.post("/", async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
        throw new Error("Invalid session")
    }

    const [createdCart] = await db.insert(cart).values({
        userId: session.user.id,
    }).returning();

    return res.json(createdCart)
  } catch (e) {
    return res.json({
      status: 500,
      message: `Unable to create cart: ${e}`,
    });
  }

})

cartRoutes.get("/:cartId", async (req, res, next) => {
    const { cartId } = req.params;
    
    try {
        const foundCart = await db.query.cart.findFirst({
            with: {
                productsToCarts: true
            },
            where: eq(cart.id, cartId),
        })

        if (foundCart) {
            return res.json(foundCart)
        }

        throw new Error("Found no cart with specified id")
    } catch(e) {
        return res.json({
            status: 500,
            message: `Failed to get cart: ${e}`,
        });
    }
})

cartRoutes.post("/:cartId/", async (req, res, next) => {
    const { cartId } = req.params;
    const { productId, quantity} = req.body
    
    try {
        const foundCart = await db.query.cart.findFirst({
            with: {
                productsToCarts: true
            },
            where: eq(cart.id, cartId),
        })

        if (!foundCart) {
            throw new Error("Found no cart with specified id")
        }

        const [inserted] = await db.insert(productsToCarts).values({
            productId,
            cartId,
            quantity,
        }).returning()

        return res.json(inserted)
    } catch(e) {
        return res.json({
            status: 500,
            message: `Failed to get cart: ${e}`,
        });
    }
})

export default cartRoutes;




export default cartRoutes;


