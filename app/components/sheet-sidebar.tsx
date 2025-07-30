import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

type Props = {
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionButton: React.ReactNode;
  children: React.ReactNode;
};

export const SheetSidebar = ({ isOpen, onOpenChange, title, actionButton, children }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <Separator className="mb-4" />
        <div className="m-4">{children}</div>
        <SheetFooter>
          {actionButton}
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
