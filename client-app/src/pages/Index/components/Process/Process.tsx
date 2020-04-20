import { Typography } from '@material-ui/core';
import React from 'react';

import styles from './process.module.scss';

const Process = () => {
  return (
    <div className={styles.process}>
      <section className={styles.wrapper_process}>
        <Typography className={styles.title} variant="h2" component="article">
          Our working process
        </Typography>
        <div className={styles.step}>
          <section className={styles.content}>
            <Typography className={styles.subtitle} variant="h4" component="article">
              Taking the Order
            </Typography>
            <Typography component="p" className={styles.paragraph}>
              The initial step. Just indicate where and where you want to move the goods
              (at the moment, almost all European countries are available).
            </Typography>
          </section>
        </div>
        <div className={styles.step}>
          <section className={styles.content}>
            <Typography className={styles.subtitle} variant="h4" component="article">
              Manage the Order
            </Typography>
            <Typography component="p" className={styles.paragraph}>
              Fill in the list of transported goods, indicating its overall volume, weight and category.
              Next, our robot will calculate the cost of the order and display the most optimal delivery options
              depending on the transport. The start of the acceptance and dispatch service starts immediately after
              order payment. Trust in our system. It is perfect.
            </Typography>
          </section>
        </div>
        <div className={styles.step}>
          <section className={styles.content}>
            <Typography className={styles.subtitle} variant="h4" component="article">
              Shipment
            </Typography>
            <Typography component="p" className={styles.paragraph}>
              We provide a free service for loading and moving goods from the place of departure to the forwarding
              center. Depending on the weight and dimensions of the parcel, the corresponding robot loader will be
              sent to you - it can be either &quot;Mr. Handy&quot; or &quot;Securitron&quot;. A converted securitron
              is capable of moving loads of up to 2 tons! Thanks to RobCo Industries for their contribution to the
              development of this wonderful machine. If our technologies cannot help you on this issue, then we provide
              you with free government facilities.
              <span className={styles.mark}>*</span>
            </Typography>
          </section>
        </div>
        <div className={styles.step}>
          <section className={styles.content}>
            <Typography className={styles.subtitle} variant="h4" component="article">
              Warehousing
            </Typography>
            <Typography component="p" className={styles.paragraph}>
              This stage with a perfectly calibrated delivery system takes an extremely small time.
              Despite this, the warehouse is fully automated and is under the control of the international
              &quot;GlaDOS&quot; system with assistants in the form of robots of the &quot;Protectron&quot;
              model. We guarantee cargo safety.
            </Typography>
          </section>
        </div>
        <div className={styles.step}>
          <section className={styles.content}>
            <Typography className={styles.subtitle} variant="h4" component="article">
              Transportation
            </Typography>
            <Typography component="p" className={styles.paragraph}>
              As soon as there is a free nearby transport suitable for the indicated loads, it is marked as busy and
              is expected in the dispatch center. Transportation starts from the moment cargo is loaded into transport.
              And here everything is robotic, surprising, right?
            </Typography>
          </section>
        </div>
        <div className={styles.step}>
          <section className={styles.content}>
            <Typography className={styles.subtitle} variant="h4" component="article">
              Delivery to the door
            </Typography>
            <Typography component="p" className={styles.paragraph}>
              Door-to-door delivery is carried out by local transport services with which we have agreements.
              Before transferring goods to services, their condition is carefully recorded and documented, because
              contractors are further liable for the goods. Arrival times are before handing over to local authorities.
              That&apos;s all, have a nice wait!
            </Typography>
          </section>
        </div>
        <div className={styles.details}>
          <span className={styles.mark}>*</span>
          free only for orders exceeding a certain amount (depends on the country of destination)
        </div>
      </section>
    </div>
  );
};

export default Process;