import { useState, useContext } from "react";
import { Session, shoppingCart } from "../Session/session";

export default function Bill () {
  const { user } = useContext(Session);
  const { cartProducts } = useContext(shoppingCart);
  return (
    <section className="bg-[#D9D9D9]">
    </section>
  )
}