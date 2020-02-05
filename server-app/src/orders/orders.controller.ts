import * as mongoose from 'mongoose';

import { CustomResponse } from "../models";
import { Track } from "./orders.models";



// async function findTrackById(id: string): Promise<Track> {
//   return new Promise((resolve) => {
//     const track = tracks.find((i: any) => i.id == id);
//     resolve(track);
//   });
// }

// async function isValidTrackId(id: string): Promise<CustomResponse> {
  // if (isNaN(id)) {
  //   return {
  //     status: {
  //       content: 'Id is not a number',
  //       code: 400,
  //     },
  //     isFound: false
  //   };
  // }
//   if (!(await findTrackById(id))) {
//     return {
//       status: {
//         content: 'Track not found',
//         code: 404,
//       },
//       isFound: false
//     };
//   }
//   return {
//     status: {
//       content: 'Ok',
//       code: 200,
//     },
//     isFound: true
//   }
// }

// export async function getTracks(): Promise<CustomResponse['status']> {
//   return {
//     content: tracks,
//     code: 200
//   }
// }

// export async function getTrackById(id: string): Promise<CustomResponse['status']> {
//   const isValid: CustomResponse = await isValidTrackId(id);
//   return !isValid.isFound ? isValid.status : {
//     content: (await findTrackById(id)),
//     code: 200
//   }
// }

// export async function getTrackUserId(id: string): Promise<CustomResponse['status']> {
//   const isValid = await isValidTrackId(id);
//   return !isValid.isFound ? isValid.status : {
//     content: ((await findTrackById(id)) as any).ownerId,
//     code: 200
//   }
// }