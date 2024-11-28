interface Session {
    sessionName: string;
    sessionId: number;
    startTime: string;
    endTime: string;
    numParticipants: number;
    state: string;
    isMatch: boolean;
}

interface SessionInfo {
    sessionId: number;
    name: string;
    startTime: string;
    endTime: string;
}

interface SensorAssign {
    sensorId: number;
    name: string;
    playerId: number;
}

interface PlayersWithoutSensor {
    playerId: number;
    name: string;
}

interface RealTimeInfo {
    playerId: number;
    playerName: string;
    playerProfilePictureUrl: string;
    heartRateData: [
        {
            value: number;
            idTimestamp: string;
        }
    ];
    heartRate: number;
}

interface SessionRealTimeData {
    sessionId: number;
    sessionName: string;
    date: string;
    time: number;
    participants: number;
    historicalDataPlayers: [
        {
            heartRateData: [
                {
                    value: number;
                    idTimestamp: string;
                }
            ];
            bodyTemperatureData: [
                {
                    value: number;
                    idTimestamp: string;
                }
            ];
            respiratoryRateData: [
                {
                    value: number;
                    idTimestamp: string;
                }
            ];
            playerId: number;
            playerName: string;
        }
    ];
    opponentTeam: string;
    type: string;
    location: string;
    weather: string;
}
interface SessionHistoricalData {
    sessionId: number;
    sessionName: string;
    date: string;
    time: number;
    participants: number;
    historicalDataPlayers: [
        {
            heartRateData: [
                {
                    value: number;
                    idTimestamp: string;
                }
            ];
            bodyTemperatureData: [
                {
                    value: number;
                    idTimestamp: string;
                }
            ];
            respiratoryRateData: [
                {
                    value: number;
                    idTimestamp: string;
                }
            ];
            playerId: number;
            playerName: string;
        }
    ];
    averageHeartRate: number;
    averageBodyTemperature: number;
    averageRespiratoryRate: number;
    opponentTeam: string;
    type: string;
    location: string;
    weather: string;
}


const getSessionInfo = async (axiosInstance: any, sessionId: number) => {
    try {
        const response = await axiosInstance.get(
            "/sessions?sessionId=" + sessionId
        );

        if (response) {
            const authResponse = response.data as SessionInfo;

            return authResponse;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getSessionsTeam = async (axiosInstance: any, teamId: number) => {
    try {
        const response = await axiosInstance.get(
            "/sessions/team?teamId=" + teamId
        );

        if (response) {
            const authResponse = response.data as Session[];

            return authResponse;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getTeamSensors = async (axiosInstance: any, teamId: number) => {
    try {
        const response = await axiosInstance.get(
            "/team/sensors?teamId=" + teamId
        );

        if (response) {
            const authResponse = response.data as SensorAssign[];

            return authResponse;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const deleteTeamSensorsAssignPlayer = async (
    axiosInstance: any,
    playerId: number,
    sensorId: number
) => {
    try {
        console.log("teamId: " + playerId + " sensorId: " + sensorId);
        const response = await axiosInstance.delete(
            "/team/sensors/assign-player",
            {
                data: {
                    playerId: playerId,
                    sensorId: sensorId,
                },
            }
        );

        if (response) {
            console.log(response);
        }
    } catch (error) {
        console.error(error);
    }
};

const getPlayersWithoutSensor = async (axiosInstance: any, teamId: number) => {
    try {
        const response = await axiosInstance.get(
            "/team/players-without-sensor?teamId=" + teamId
        );

        if (response) {
            const authResponse = response.data as PlayersWithoutSensor[];

            return authResponse;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const postSensorPlayer = async (
    axiosInstance: any,
    playerId: number,
    sensorId: number
) => {
    try {
        const response = await axiosInstance.post(
            "/team/sensors/assign-player",
            {
                playerId: playerId,
                sensorId: sensorId,
            }
        );

        if (response) {
            console.log(response);
        }
    } catch (error) {
        console.error(error);
    }
};

const postSessions = async (
    axiosInstance: any,
    name: string,
    trainerId: number
) => {
    try {
        const response = await axiosInstance.post("/sessions", {
            name: name,
            trainerId: trainerId,
        });

        if (response) {
            console.log(response);
            return response.data.sessionId;
        }

    } catch (error) {
        console.error(error);
    }
};

const postMatch = async (
    axiosInstance: any,
    name: string,
    trainerId: number,
    opponentTeam: string,
    type: string,
    location: string,
    weather: string
) => {
    try {
        const response = await axiosInstance.post("/sessions/match", {
            name: name,
            trainerId: trainerId,
            opponentTeam: opponentTeam,
            type: type,
            location: location,
            weather: weather
        });

        if (response) {
            console.log(response);
            return response.data.sessionId;
        }

    } catch (error) {
        console.error(error);
    }
}

const postSessionsAssignPlayer = async (
    axiosInstance: any,
    sessionId: number,
    playerId: number
) => {
    try {
        const response = await axiosInstance.post("/sessions/assign-player", {
            sessionId: sessionId,
            playerId: playerId,
        });

        if (response) {
            console.log(response);
        }
    } catch (error) {
        console.error(error);
    }
};

const getTeamPlayersAvailableReaTimeInfo = async (
    axiosInstance: any,
    teamId: number
) => {
    try {
        const response = await axiosInstance.get(
            "/team/players-available/real-time-info?teamId=" + teamId
        );

        if (response) {
            const authResponse = response.data as RealTimeInfo[];

            return authResponse;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getSessionRealTimeData = async (
    axiosInstance: any,
    trainerId: number
): Promise<SessionRealTimeData | null> => {
    try {
        const response = await axiosInstance.get(
            "/sessions/real-time-info-trainer?trainerId=" + trainerId
        );

        if (response.status === 200) {
            console.log(response);
            return response.data as SessionRealTimeData;
        }

        return null; 
    } catch (error: any) {
        if (error.response?.status === 404) {
            console.warn("No session available for this trainer.");
            return null;
        }
        console.error("Unexpected error:", error);
        throw error;
    }
};


const getBySessionRealTimeData = async (
    axiosInstance: any,
    sessionId: number
) => {
    try {
        const response = await axiosInstance.get(
            "/sessions/real-time-info?sessionId=" + sessionId
        )

            const authResponse = response.data as SessionRealTimeData;
    
            return authResponse;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

const getBySessionHistoricalData = async (
    axiosInstance: any,
    sessionId: number
) => {
    try {
        const response = await axiosInstance.get(
            "/sessions/historical-info?sessionId=" + sessionId
        );

        if (response) {
            console.log(response);
            const authResponse = response.data as SessionHistoricalData;

            return authResponse;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
    
const endSession = async (
    axiosInstance: any,
    sessionId: number
) => {
    try {
        const response = await axiosInstance.post(
            "/sessions/end?sessionId=" + sessionId
        );

        if (response) {
            console.log(response);
        }
            
    } catch (error) {
        console.error(error);
    }
}

export {
    getSessionInfo,
    getSessionsTeam,
    getTeamSensors,
    deleteTeamSensorsAssignPlayer,
    getPlayersWithoutSensor,
    postSensorPlayer,
    postSessions,
    postSessionsAssignPlayer,
    getTeamPlayersAvailableReaTimeInfo,
    getSessionRealTimeData,
    getBySessionRealTimeData,
    getBySessionHistoricalData,
    endSession,
    postMatch
};
export type { Session, SensorAssign, PlayersWithoutSensor, RealTimeInfo, SessionRealTimeData, SessionHistoricalData };
