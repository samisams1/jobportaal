import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Job, JobAttributes, JobCreationAttributes } from '../models/Job';

export class JobsController {
  // Get all jobs
  static async getAllJobs(req: Request, res: Response): Promise<Response<JobAttributes[]>> {
    try {
      const jobs = await Job.findAll();
      return res.status(StatusCodes.OK).json(jobs);
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }

  // Get a single job
  static async getJobById(req: Request, res: Response): Promise<Response<JobAttributes | { error: string }>> {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id);

      if (!job) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Job not found' });
      }

      return res.status(StatusCodes.OK).json(job);
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }

  // Create a new job
  static async createJob(req: Request, res: Response): Promise<Response<JobAttributes>> {
    try {
      const jobData: JobCreationAttributes = req.body;
      const newJob = await Job.create(jobData);
      return res.status(StatusCodes.CREATED).json(newJob);
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }

  // Update a job
  static async updateJob(req: Request, res: Response): Promise<Response<JobAttributes | { error: string }>> {
    try {
      const { id } = req.params;
      const jobData: JobAttributes = req.body;
      const [updatedRowCount, [updatedJob]] = await Job.update(jobData, {
        where: { id },
        returning: true,
      });

      if (updatedRowCount === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Job not found' });
      }

      return res.status(StatusCodes.OK).json(updatedJob);
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }

  // Delete a job
  static async deleteJob(req: Request, res: Response): Promise<Response<void>> {
    try {
      const { id } = req.params;
      const deletedRowCount = await Job.destroy({ where: { id } });

      if (deletedRowCount === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Job not found' });
      }

      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (err: unknown) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message });
    }
  }
}