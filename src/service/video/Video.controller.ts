import { NextFunction, Request, Response } from "express";
import { Database } from "../../utils/Database";

export class VideoController {
    async getAllASBCampaign(request: Request, response: Response, next: NextFunction) {
        const query: string = 'SELECT CAMPAIGN_CODE as campaignCode, CAMPAIGN_NAME as campaignName, START_DATE_TIME as startDateTime, ' +
            'END_DATE_TIME as endDateTime, CAMPAIGN_STATUS as campaignStatus, INSERT_DATE as insertDateTime, ' +
            'INSERT_BY as insertBy, UPDATE_DATE as updateDateTime, UPDATE_BY as updateBy FROM ASB_CAMPAIGN;';
        const result = await Database.runQuery(query);
        response.send(result);
    }

    async getASBCampaign(request: Request, response: Response, next: NextFunction) {
        const query: string = 'SELECT CAMPAIGN_CODE as campaignCode, CAMPAIGN_NAME as campaignName, START_DATE_TIME as startDateTime, ' +
            'END_DATE_TIME as endDateTime, CAMPAIGN_STATUS as campaignStatus, INSERT_DATE as insertDateTime, ' +
            'INSERT_BY as insertBy, UPDATE_DATE as updateDateTime, UPDATE_BY as updateBy FROM ASB_CAMPAIGN WHERE CAMPAIGN_CODE = ?;';
        const parameters = request.query;
        const result = await Database.runQuery(query, [parameters.code.toString()]);
        response.send(result);
    }

    async getASBCampaignChild(request: Request, response: Response, next: NextFunction) {
        const query: string = 'SELECT LINKED_CATEGORY_VALUE as code FROM ASB_CAMPAIGN_CHILD ' +
            'WHERE ASB_CAMPAIGN_CHILD.CAMPAIGN_CODE = ?;';
        const parameters = request.query;
        const result = await Database.runQuery(query, [
            parameters.code.toString()
        ]);
        response.send(result);
    }

    async saveASBCampaign(request: Request, response: Response, next: NextFunction) {
        const query: string = 'INSERT INTO ASB_CAMPAIGN (CAMPAIGN_CODE, CAMPAIGN_NAME, START_DATE_TIME, END_DATE_TIME, CAMPAIGN_STATUS, ' +
            'INSERT_BY) VALUES (?, ?, ?, ?, ?,?)';
        const parameters = request.body;
        const result = await Database.runQuery(query, [parameters.campaignCode, parameters.campaignName, parameters.startDateTime,
        parameters.endDateTime, parameters.campaignStatus, parameters.insertBy]);
        response.send(result);
    }

    async updateASBCampaign(request: Request, response: Response, next: NextFunction) {
        const query: string = 'UPDATE ASB_CAMPAIGN SET CAMPAIGN_NAME = ?, START_DATE_TIME = ?, END_DATE_TIME = ?, CAMPAIGN_STATUS = ?, ' +
            'UPDATE_BY = ? WHERE (CAMPAIGN_CODE = ?);';
        const parameters = request.body;
        const result = await Database.runQuery(query, [parameters.campaignName, parameters.startDateTime,
        parameters.endDateTime, parameters.campaignStatus, parameters.updateBy, parameters.campaignCode]);
        response.send(result);
    }

    async isASBCampaignExist(request: Request, response: Response, next: NextFunction) {
        const query: string = 'SELECT EXISTS(SELECT * FROM ASB_CAMPAIGN ' +
            'WHERE CAMPAIGN_CODE = ?) AS IsExist';
        const parameters = request.query;
        const result = await Database.runQuery(query, [parameters.code.toString()]);
        response.send(result);
    }

    async deleteASBCampaign(request: Request, response: Response, next: NextFunction) {
        const query: string = 'DELETE FROM ASB_CAMPAIGN WHERE CAMPAIGN_CODE = ?';
        const parameters = request.query;
        const result = await Database.runQuery(query, [parameters.code.toString()]);
        response.send(result);
    }

    async deleteASBCampaignChild(request: Request, response: Response, next: NextFunction) {
        const query: string = 'DELETE FROM ASB_CAMPAIGN_CHILD WHERE CAMPAIGN_CODE = ?';
        const parameters = request.query;
        const result = await Database.runQuery(query, [parameters.code.toString()]);
        response.send(result);
    }
}