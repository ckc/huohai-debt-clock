import React, {useEffect, useState, useRef} from "react";
type Base = { principal:number; accrued:number; rate:number; lastUpdate:string };
export default function DebtClock(){
  const [base, setBase] = useState<Base>({principal:10000,accrued:0,rate:0.12,lastUpdate:new Date().toISOString()});
  useEffect(()=>{ const t = setInterval(()=>{ setBase(b=>({...b, accrued: b.accrued + (b.principal*b.rate/365/24/3600)})); },1000); return
