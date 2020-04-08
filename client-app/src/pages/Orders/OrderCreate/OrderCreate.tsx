import React, { useEffect, useState } from 'react';

import { Button, Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import Notification from '../../../components/Notification/Notification';
import { cargoTypes } from '../../../models/cargo.models';
import { MessageType, ServerResponse } from '../../../models/message.models';
import { defaultOrderUser, OrderUser } from '../../../models/order.models';
import { UserPath } from '../../../models/path.models';
import { createOrder } from '../../../services/orders.service';
import OrderAdditional from './OrderAdditional/OrderAdditional';
import OrderCargo from './OrderCargo/OrderCargo';
import OrderComplete from './OrderComplete/OrderComplete';
import styles from './orderCreate.module.scss';
import OrderLocations from './OrderLocations/OrderLocations';
import OrderPathsList from './OrderPathsList/OrderPathsList';
import OrderPayment from './OrderPayment/OrderPayment';

enum Steps {
  Locations, 
  Cargo,
  Path,
  Payment,
  Additional,
  Finish
}

type StepSubtitleType = {
  [key: number]: string;
};

const OrderCreate = () => {
  const [order, setOrder] = useState<OrderUser>(defaultOrderUser);
  const [trackNumber, setTrackNumber] = useState('');

  const [activeStep, setActiveStep] = useState(0);
  const [stepSubtitles, setStepSubtitles] = useState<StepSubtitleType | null>(null);

  const [isOrderTaken, setOrderTaken] = useState(false);

  const [dialogResult, setDialogResult] = useState<ServerResponse<string> | null>(null);

  const stepTitles = [
    'Enter start and end locations', 
    'Enter cargo', 
    'Choose suitable route', 
    'Pay for the order',
    'Enter additional information'
  ];

  const setSubtitle = (step: number, subtitle: string) => {
    setStepSubtitles((prev) => {
      return { ...prev, [step]: subtitle };
    });
  };

  const takeOrder = async (path: UserPath) => {
    const response = await createOrder(path);
    if (response.messageType === MessageType.Error) {
      setDialogResult(response);
    } else if (typeof response.data === 'string') {
      setTrackNumber(response.data);
      setOrderTaken(true);
    }
  };

  useEffect(() => {
    setSubtitle(activeStep, '');
    switch (activeStep) {
      case Steps.Locations: {
        setOrder({ ...order, locations: null });
        break;
      }
      case Steps.Cargo: {
        setSubtitle(Steps.Locations, `${order.locations?.from.name} – ${order.locations?.to.name}`);
        break;
      }
      case Steps.Path: {
        const cargoTypesNumber = cargoTypes.map((type) => {
          return order.cargo.filter(cargo => cargo.category === type).length;
        });
        const cargoList = cargoTypesNumber.map((number, index) => {
          return number ? `${number} ${cargoTypes[index].toLowerCase()}` : undefined;
        }).filter(cargo => cargo);
        setSubtitle(Steps.Cargo, cargoList.length ? cargoList.join(', ') : 'No cargos');
        break;
      }
      case Steps.Payment: {
        const routes = order.path?.paths.map(path => {
          const routesLength = path.routes.length;
          return `${path.routes[0]} – ${path.routes[routesLength - 1]} (${path.vehicle})`;
        });
        setSubtitle(Steps.Path, `${routes?.join(', ')}`);
        break;
      }
      case Steps.Additional: {
        setOrder({ ...order, isPaid: true });
        setSubtitle(Steps.Payment, 'Payed');
        break;
      }
      case Steps.Finish: {
        if (order.path) {
          const path: UserPath = {
            ...order.path,
            message: order.message
          };
          takeOrder(path);
        }
        break;
      }
      default: break;
    }
  }, [activeStep]);

  const resetOrder = () => {
    setOrder(defaultOrderUser);
    setActiveStep(0);
    setOrderTaken(false);
    setStepSubtitles(null);
    setTrackNumber('');
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepComponent = (step: number) => {
    switch (step) {
      case Steps.Locations: return <OrderLocations resultLocations={(locations) => setOrder({ ...order, locations })} />;
      case Steps.Cargo: return <OrderCargo list={order.cargo} resultCargo={(cargo) => setOrder({ ...order, cargo })} />;
      case Steps.Path: return <OrderPathsList order={order} resultPath={(path) => setOrder({ ...order, path})} />;
      case Steps.Payment: return order.path?.price ? <OrderPayment price={order.path?.price} /> : 'Undefined Price';
      case Steps.Additional: return <OrderAdditional message={order.message} resultMessage={(message) => setOrder({ ...order, message })} />;
      default: return <div />;
    }
  };

  const getButtonState = () => {
    if (activeStep === Steps.Locations) {
      return !order.locations;
    } 
    if (activeStep === Steps.Path) {
      return !order.path;
    }
    return false;
  };

  return (
    <div className={styles.order_wrapper}>
      {dialogResult && <Notification {...dialogResult} afterClose={() => setDialogResult(null)} />}
      {!isOrderTaken ? (
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
      ) : (
        <OrderComplete trackNumber={trackNumber} createNewOrder={resetOrder} />
      )}
    </div>
  );
};

export default OrderCreate;