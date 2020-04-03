import React, { useEffect, useState } from 'react';

import { Button, Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import { MessageType } from '../../../models/message.models';
import { defaultOrderUser, OrderUser } from '../../../models/order.models';
import { UserPath } from '../../../models/path.models';
import { createOrder } from '../../../services/orders.service';
import OrderCargo from './OrderCargo/OrderCargo';
import OrderComplete from './OrderComplete/OrderComplete';
import styles from './orderCreate.module.scss';
import OrderLocations from './OrderLocations/OrderLocations';
import OrderPathsList from './OrderPathsList/OrderPathsList';
import OrderPay from './OrderPay/OrderPay';

enum Steps {
  Locations, 
  Cargo,
  Route,
  Payment,
  Departure
}

type StepSubtitleType = {
  [key: number]: string;
};

const OrderCreate = () => {
  const [order, setOrder] = useState<OrderUser>(defaultOrderUser);
  const [trackNumber, setTrackNumber] = useState('');

  const [activeStep, setActiveStep] = useState(0);
  const [stepSubtitles, setStepSubtitles] = useState<StepSubtitleType | null>(null);

  const stepTitles = [
    'Enter start and end locations', 
    'Enter cargo', 
    'Choose suitable route', 
    'Pay for the order',
    'Enter the time and place where to pick up the cargo'
  ];

  const setSubtitle = (step: number, subtitle: string) => {
    setStepSubtitles((prev) => {
      return { ...prev, [step]: subtitle };
    });
  };

  useEffect(() => {
    setSubtitle(activeStep, '');
    switch (activeStep) {
      case Steps.Locations: {
        setOrder({ ...order, locations: null });
        break;
      }
      case Steps.Locations + 1: {
        setSubtitle(Steps.Locations, `${order.locations?.from.name} – ${order.locations?.to.name}`);
        break;
      }
      case Steps.Cargo + 1: {
        setSubtitle(Steps.Cargo, 'Cargo');
        break;
      }
      default: break;
    }
  }, [activeStep]);

  const takeOrder = async (path: UserPath) => {
    const response = await createOrder(path);
    if (response.messageType === MessageType.Error) {
      
    } else if (typeof response.data === 'string') {
      setTrackNumber(response.data);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepComponent = (step: number) => {
    switch (step) {
      case 0: return <OrderLocations resultLocations={(locations) => setOrder({ ...order, locations })} />;
      case 1: return <OrderCargo resultCargo={(cargo) => setOrder({ ...order, cargo })} />;
      case 2: return <OrderPathsList order={order as OrderUser} callback={takeOrder} />;
      case 3: return <OrderPay />;
      case 4: return <div />;
      default: return <div />;
    }
  };

  const getButtonState = () => {
    if (activeStep === Steps.Locations) {
      return !order.locations;
    } 
    return false;
    
  };

  return (
    <div className={styles.order_wrapper}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepTitles.map((label, index) => {
          const stepSubtitle = stepSubtitles && stepSubtitles[index];
          return (
            <Step key={label}>
              <StepLabel>
                <span className={styles.title}>{label}</span>
                <Collapse in={!!stepSubtitle}>
                  <span className={styles.subtitle}>
                    {stepSubtitle}
                  </span>
                </Collapse>
              </StepLabel>
              <StepContent>
                {getStepComponent(index)}
                <div className={styles.buttons}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={getButtonState()}
                  >
                    {activeStep === stepTitles.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === stepTitles.length && (
        <OrderComplete trackNumber={trackNumber} createNewOrder={() => {}} />
      )}
      {/* {!isOrderTaken ? (
        <Card className={styles.order}>
          <form noValidate autoComplete="off">
            <section className={styles.form}>
              <article className={styles.title}>Create order</article>
              {!locations ? (
                <Skeleton variant="rect" height={60} />
              ) : (
                <TextField
                  name="cargo"
                  label="Cargo"
                  variant="outlined"
                  onChange={handleInput}
                  fullWidth
                />
              )}
              {!locations ? (
                <Skeleton variant="rect" height={60} />
              ) : (
                <TextField
                  name="message"
                  label="Message"
                  variant="outlined"
                  onChange={handleInput}
                  multiline
                  fullWidth
                />
              )}
              {isRoutesShown ? (
                <div className={styles.list}>
                  <article className={styles.title}>
                    Choose a suitable route
                  </article>
                  <OrderPathsList
                    order={order as OrderUser}
                    callback={takeOrder}
                  />
                </div>
              ) : (
                <div className={styles['button-check']}>
                  {!errors.from && !errors.to ? (
                    <Button
                      variant="outlined"
                      color="primary" 
                      onClick={showRoutes}
                      disabled={!locations}
                      fullWidth
                    >
                      Show possible routes
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={showRoutes}
                      fullWidth
                    >
                      Choose from and to locations
                    </Button>
                  )}
                </div>
              )}
            </section>
          </form>
        </Card>
      ) : (
        <OrderComplete trackNumber={trackNumber} createNewOrder={resetOrder} />
      )} */}
    </div>
  );
};

export default OrderCreate;