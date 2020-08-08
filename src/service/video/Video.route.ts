import { VideoController } from "./Video.controller";

export const VideoRoute = [
    {
        method: "get",
        path: "getAllASBCampaign",
        controller: VideoController,
        action: "getAllASBCampaign"
    },
    {
        method: "get",
        path: "getASBCampaign",
        controller: VideoController,
        action: "getASBCampaign"
    },
    {
        method: "get",
        path: "getASBCampaignChild",
        controller: VideoController,
        action: "getASBCampaignChild"
    },
    {
        method: "put",
        path: "saveASBCampaign",
        controller: VideoController,
        action: "saveASBCampaign"
    },
    {
        method: "put",
        path: "updateASBCampaign",
        controller: VideoController,
        action: "updateASBCampaign"
    },
    {
        method: "get",
        path: "isASBCampaignExist",
        controller: VideoController,
        action: "isASBCampaignExist"
    },
    {
        method: "delete",
        path: "deleteASBCampaign",
        controller: VideoController,
        action: "deleteASBCampaign"
    },
    {
        method: "delete",
        path: "deleteASBCampaignChild",
        controller: VideoController,
        action: "deleteASBCampaignChild"
    }
];