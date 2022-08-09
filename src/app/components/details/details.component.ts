import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../models";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public gameRating: number = 0;
  public gameId!: string;
  public game!: Game;
  public loading: boolean = false;
  private routSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.routSub = this.activeRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id: string): void{
    this.loading = true;
    this.gameSub = this.httpService.getGameDetails(id)
      .subscribe((gameRes: Game) => {
      this.game = gameRes;
      this.loading = false;
      setTimeout(() => {
        this.gameRating = this.game.metacritic
      }, 1000)
    })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if(value > 30){
      return '#f7aa38';
    }else{
      return '#ef4655'
    }
  }


  ngOnDestroy(): void {
    if(this.routSub){
      this.routSub.unsubscribe();
    }
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
  }
}
