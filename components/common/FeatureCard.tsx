import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

// Feature Card Component
const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button variant="outline" size="sm">
        Learn More
      </Button>
    </CardContent>
  </Card>
);

export default FeatureCard;
