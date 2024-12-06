export default function Price({ price }: { price: number }) {
  let euro = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  });
  return <span>{`${euro.format(price)}`}</span>;
}
