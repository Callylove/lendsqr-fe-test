import React from "react";
import Card, { CardBody } from "@/components/Card";
import styles from "../../../../styles/StatsCard.module.scss";
import { StatsCardProps } from "./types";

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  className = "",
  ...restProps
}) => {
  const cardClasses = `${styles.statsCard}  ${className}`;

  return (
    <Card className={cardClasses} {...restProps}>
      <CardBody>
        <div className={styles.statsCardContent}>
          {icon && <div className={styles.iconContainer}>{icon}</div>}
          <div className={styles.statsInfo}>
            <div className={styles.title}>{title}</div>
            <div className={styles.value}>{value}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
