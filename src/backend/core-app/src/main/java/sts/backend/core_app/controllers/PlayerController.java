package sts.backend.core_app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;
import sts.backend.core_app.dto.player.FatigueResponse;
import sts.backend.core_app.dto.player.MetricValue;
import sts.backend.core_app.dto.player.OverviewStressResponse;
import sts.backend.core_app.dto.player.RecoveryStrainResponse;
import sts.backend.core_app.dto.player.SleepResponse;
import sts.backend.core_app.exceptions.ResourceNotFoundException;
import sts.backend.core_app.models.SensorTimeSeriesData;
import sts.backend.core_app.services.business.PlayerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/v1")
public class PlayerController {
    
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/player/overview-stress")
    public OverviewStressResponse api_get_overview_stress(@RequestParam Long playerId, @RequestParam String timeOption) {
        return playerService.getOverviewStress(playerId, timeOption); // TODO: implement
    }

    @GetMapping("/player/sleep")
    public SleepResponse api_get_sleep(@RequestParam Long playerId, @RequestParam String timeOption) {
        return playerService.getSleep(playerId, timeOption); // TODO: implement
    }

    @GetMapping("/player/recovery-strain")
    public RecoveryStrainResponse api_get_recovery_strain(@RequestParam Long playerId, @RequestParam String timeOption) {
        return playerService.getRecoveryStrain(playerId, timeOption); // TODO: implement
    }

    @GetMapping("/player/player-fatigue/all-days-of-year")
    public FatigueResponse api_get_player_fatigue_all_days_of_year(@RequestParam Long playerId, @RequestParam Long year) {
        return playerService.getPlayerFatigueAllDaysOfYear(playerId, year); // TODO: implement
    }

    // TO BE REMOVED !!!!!!!!!!!!!!!!!!
    @PostMapping("/player/add-metric-value")
    public SensorTimeSeriesData api_add_metric_value(@RequestBody MetricValue metricValue) throws ResourceNotFoundException {
        System.out.println("Adding metric value: " + metricValue.getPlayerId() + " " + metricValue.getMetricName() + " " + metricValue.getValue());
        return playerService.addMetricValue(metricValue);
    }

}
