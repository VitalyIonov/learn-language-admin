import type { Route } from "./+types/users";
import { Button } from '~/components/ui/button';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Users() {
  const handleClick = () => {
    console.log("Button clicked!");
  }

  return <Button variant="outline" onClick={handleClick}>Button</Button>;
}
