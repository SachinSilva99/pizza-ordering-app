import {Document, Schema, Types} from "mongoose";

import {JobType, Modality, PaymentMethod, Status, UserType} from "../enums/Enums";


export interface IJobCategory extends Document {
  name: string;
  subCategories: string[]
}

export interface IUser extends Document {
  username: string,
  fName: string,
  lName: string,
  email: string,
  password: string
  userType: UserType,
  deleteStatus: boolean
}

export interface IRequest extends Document {
  company: Types.ObjectId,
  jobTitle: string,
  description: string,
  salary?: number
  jobSeeker: Types.ObjectId,
  status: Status,
  view: boolean,
  deleteStatus: boolean,
}

export interface IJobSeeker extends Document {
  category: string,
  subCategory: string,
  resume: string,
  avatar: string,
  jobSeekerContact: string,
  gender: string,
  user: Types.ObjectId,
  deleteStatus: boolean,
  about: string,
  currentPosition: string
}

export interface ICompanyPackage extends Document {
  name: string,
  description: string,
  price: number,
  paymentMethod: PaymentMethod,
  deleteStatus: boolean
}

export interface ICompany extends Document {
  companyName: string,
  companyLogo: string,
  companySize: number,
  user: Types.ObjectId,
  preferredPackage: Types.ObjectId,
  deleteStatus: boolean
}

export interface IOpportunity extends Document {
  company: Types.ObjectId,
  jobSeeker: Types.ObjectId,
}

export interface IVacancy extends Document {
  company: Types.ObjectId,
  jobTitle: string,
  description: string,
  category: string,
  subCategory: string,
  jobType: JobType,
  modality: Modality,
  salary?: number,
  endingDate: Date,
  startingDate: Date,
  deleteStatus: boolean
}

export interface IPayment extends Document {
  company: Types.ObjectId,
  paidDate: Date,
  status: string,
  paymentMethod: string,
  bankSlip: string,
  paidAmount: number
}

export interface ISubmission extends Document {
  vacancy: Types.ObjectId,
  jobSeeker: Types.ObjectId,
  status: string
}

export interface IApplication extends Document {
  jobSeeker: Types.ObjectId,
  vacancy: Types.ObjectId,
  coverLetter: string,
  status: Status,
  view: boolean,
  deleteStatus: boolean
}


